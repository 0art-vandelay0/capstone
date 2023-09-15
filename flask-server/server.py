from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from Twilio import send_sms
import os

load_dotenv()


class Database:
    client = None
    # db = None

    @classmethod
    def connect(cls):
        mongodb_url = os.environ.get('MONGODB_URL')
        print(os.environ.get('MONGODB_URL'))
        if cls.client is None:
            cls.client = MongoClient(mongodb_url)
            cls.db = cls.client['Bathroom']


app = Flask(__name__)
CORS(app)
Database.connect()


@app.route('/bathrooms', methods=['GET'])
def bathrooms():
    try:
        bathrooms_collection = Database.db['Bathrooms']
        bathrooms = list(bathrooms_collection.find())
        for bathroom in bathrooms:
            bathroom["_id"] = str(bathroom["_id"])
        return jsonify({"bathrooms": bathrooms})
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


@app.route('/send_sms', methods=['POST'])
def send_sms_route():
    try:
        message_sid = send_sms(body, to, from_)
        return jsonify({"success": True, "message_sid": message_sid})
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


if __name__ == "__main__":
    app.run(debug=True)
