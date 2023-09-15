# from flask import Flask

# app=Flask(__name__)

# @app.route('/members')
# def members():
#     return {"members": ["Member1", "Member2", "Member3"]}

# if __name__ == "__main__":
#     app.run(debug=True)






# from flask import Flask, jsonify
# from flask_cors import CORS
# from pymongo import MongoClient

# app = Flask(__name__)
# CORS(app)

# # client = MongoClient("mongodb+srv://georgeglass012:QWAQkqRI3XgyKTqu@cluster0.mclwxsc.mongodb.net/?retryWrites=true&w=majority")
# client = MongoClient("mongodb+srv://georgeglass012:QWAQkqRI3XgyKTqu@cluster0.mclwxsc.mongodb.net/?retryWrites=true&w=majority", tlsAllowInvalidCertificates=True)

# db = client['Bathroom']

# # @app.route('/bathrooms', methods=['GET'])
# # def bathrooms():
# #     bathrooms_collection = db['Bathrooms']
# #     bathrooms = list(bathrooms_collection.find())
# #     for bathroom in bathrooms:
# #         bathroom["_id"] = str(bathroom["_id"])
# #     return jsonify({"bathrooms": bathrooms})

# # if __name__ == "__main__":
# #     app.run(debug=True)

# @app.route('/bathrooms', methods=['GET'])
# def bathrooms():
#     try:
#         bathrooms_collection = db['Bathrooms']
#         bathrooms = list(bathrooms_collection.find())
#         for bathroom in bathrooms:
#             bathroom["_id"] = str(bathroom["_id"])
#         return jsonify({"bathrooms": bathrooms})
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return jsonify({"error": f"An error occurred: {e}"}), 500






from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
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

if __name__ == "__main__":
    app.run(debug=True)