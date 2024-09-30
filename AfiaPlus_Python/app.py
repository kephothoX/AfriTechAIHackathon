# from flask import request
# from app import app
#
#
#
import os, io, re, uuid, requests
from pathlib import Path

import urllib.request
from inscriptis import get_text


from flask import Flask, request
from flask_restful import Resource, Api
from flask import request, Response, jsonify, json, abort
from flask_restful import Resource, Api
from flask_cors import CORS
from werkzeug.utils import secure_filename

from tidb_vector.integrations import TiDBVectorClient
from peewee import Model, MySQLDatabase, TextField, SQL
import pymysql
from pymysql import Connection
from pymysql.cursors import DictCursor
from tidb_vector.peewee import VectorField

import convex
from convex import ConvexClient

from bs4 import BeautifulSoup

import google.generativeai as genai
from pypdf import PdfReader

import docx
import pandas as pd

from config import Config
from dotenv import load_dotenv
dotenv_path = Path("./.env")
load_dotenv(dotenv_path=dotenv_path)
from pprint import pprint


app = Flask(__name__)
api = Api(app, prefix="/api")
CORS(app, resources={r"/*": {"origins": "*"}})


genai.configure(api_key=os.environ.get("API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")
embedding_model = "models/text-embedding-004"
embedding_dimensions = 768

print(os.environ.get("API_KEY"))

def get_db_engine():
    config = Config()
    connect_params = {}
    if os.environ.get("CA_PATH"):
        connect_params = {
            "ssl_verify_cert": True,
            "ssl_verify_identity": True,
            "ssl_ca": os.environ.get("CA_PATH"),
        }
    return MySQLDatabase(
        os.environ.get('TIDB_DB_NAME'),
        host=os.environ.get("TIDB_HOST"),
        port=int(os.environ.get('TIDB_PORT')),
        user=os.environ.get("TIDB_USER"),
        password=os.environ.get("TIDB_PASSWORD"),
        **connect_params,
    )


db = get_db_engine()


def InlineFormatting(text):
    text = re.sub(r"\_(.+?)_\|", "", text)
    text = re.sub(r"\*\*(.+?)\*\*", "", text)
    return text

class SayHello(Resource):
    def get(self):
        return jsonify(response="Kephotho Solutions OnRender Alive And Well...... Bring It On!!!")


api.add_resource(SayHello, "/")



class NewDocumentEmbeddings(Resource):
    def post(self):
        documents = []
        
        
        if (request.form.get("fileType") == 'pdf'):
            reader = PdfReader(request.files.get("file"))
            pages = len(reader.pages)

            for page in range(int(pages)):
                _page = reader.pages[page]
                documents.append(re.sub(r"[^a-zA-Z0-9\s]", "", _page.extract_text()))



        elif (request.form.get("fileType") == "xlsx"):
            documents = pd.read_excel(request.files.get("file"))


        elif (request.form.get("fileType") == "docx"):
            doc = docx.Document(request.files.get("file"))
            text = []
            for para in doc.paragraphs:
                text.append(para.text)
            documents.append(re.sub(r"[^a-zA-Z0-9\s]", "", '\n'.join(text)))
                

        elif (request.form.get("fileType") == "html"):
            htmlDoc = request.files.get("file").read()
            soup = BeautifulSoup(htmlDoc, "html.parser")
            text = soup.get_text().replace("\n", "")
            
            documents.append(text.replace("!@#$%^&*()[]{};:,./<>?\|`~-=_+“", " "))



        elif (request.form.get("fileType") == "txt"):
            file = request.files.get("file")
            documents.append(re.sub(r"[^a-zA-Z0-9\s]", "", str(file.read())))
                

        else:
            return jsonify(response="We currently have no support for the uploaded document. We only support .docx, .pdf, .txt and .xlsx")

        embeddings = genai.embed_content(
            model=embedding_model, content=documents, task_type="retrieval_document"
        )
        
        
        vector_store = TiDBVectorClient(
            table_name="HealthDataset",
            connection_string=os.environ.get("TIDB_DATABASE_URL"),
            vector_dimension=768,
        )
        
        vector_store.insert(
            id=uuid.uuid4(),
            texts=documents,
            embeddings=embeddings["embedding"],
            metadatas=request.form.get('topic')
        )

        return jsonify(response="Document is AI Ready!!!")



api.add_resource(NewDocumentEmbeddings, "/embeddings/new")


class Prompt(Resource):
    def post(self):
        query = request.form.get("prompt")
        query_embeddings = genai.embed_content(
            model=embedding_model, content=[query], task_type="retrieval_query"
        )["embedding"][0]

        vector_store = TiDBVectorClient(
            table_name="HealthDataset",
            connection_string=os.environ.get("TIDB_DATABASE_URL"),
            vector_dimension=768,
        )
        

        related_docs = vector_store.query(query_embeddings)
        docs = []

        for doc in related_docs:
            docs.append(doc.document)

        db.close()
        context = " ".join(docs)
        
        prompt = f"{ query } in this { context } context format answer as text"
        
        
        chat = model.start_chat(
            history=[
                {"role": "user", "parts": "Hello"},
                {"role": "model", "parts": "Great to meet you. What would you like to know?"},
            ]
        )
        response = chat.send_message(prompt)

      

        return jsonify(response=InlineFormatting(response.text))


api.add_resource(Prompt, "/prompt")


class Chat(Resource):
    def post(self):
        query = request.form.get("prompt")
        query_embeddings = genai.embed_content(
            model=embedding_model, content=[query], task_type="retrieval_query"
        )["embedding"][0]

        vector_store = TiDBVectorClient(
            table_name="HealthDataset",
            connection_string=os.environ.get("TIDB_DATABASE_URL"),
            vector_dimension=768,
        )
        

        related_docs = vector_store.query(query_embeddings)
        docs = []

        for doc in related_docs:
            docs.append(doc.document)

        db.close()
        context = " ".join(docs)
        
        prompt = f"{ query } on this { context } context and suggest follow up questions then format answer as text"
        
        
        response = model.generate_content(prompt)
      

        return jsonify(response=InlineFormatting(response.text))


api.add_resource(Chat, "/chat")


class SelfDiagnosis(Resource):
    def post(self):
        query = request.form.get("symptoms")
        query_embeddings = genai.embed_content(
            model=embedding_model, content=[query], task_type="retrieval_query"
        )["embedding"][0]

        vector_store = TiDBVectorClient(
            table_name="HealthDataset",
            connection_string=os.environ.get("TIDB_DATABASE_URL"),
            vector_dimension=768,
        )
        

        related_docs = vector_store.query(query_embeddings)
        docs = []

        for doc in related_docs:
            docs.append(doc.document)

        db.close()
        context = " ".join(docs)
        
        prompt = f"given { query } and { context } as context, suggest a diagnosis for { request.form.get('name') } { request.form.get('gender') } born on {request.form.get('dob') }, with { request.form.get('pre_conditions') } weighing { request.form.get('weight') } in kgs, currently taking { request.form.get('medications') }, and provide follow up questions and  personalize and format answer as html"
        response = model.generate_content(prompt)
      

        return jsonify(response=InlineFormatting(response.text))


api.add_resource(SelfDiagnosis, "/self-diagnosis")


class SummarizeText(Resource):
    def post(self):
        query = request.form.get("prompt")

        prompt = f"summarize  this { query } format answer as text"
        response = model.generate_content(prompt)

        return jsonify(response=InlineFormatting(response.text))


api.add_resource(SummarizeText, "/summarize")


class Translate(Resource):
    def post(self):
        prompt = request.form.get("query")
        response = model.generate_content(prompt)

        return jsonify(response=InlineFormatting(response.text))


api.add_resource(Translate, "/translate")


class TranslateHTMLContent(Resource):
    def post(self):
      soup = BeautifulSoup(request.form.get("content"), "html.parser")
      text = soup.get_text().replace("\n", "")
      prompt = f"translate { text } to { request.form.get('lang')} and format answer as HTML"
      response = model.generate_content(prompt)

      return jsonify(response=InlineFormatting(response.text))


api.add_resource(TranslateHTMLContent, "/translate-html")

