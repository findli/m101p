
import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the database
db = connection.students
grades = db.grades

try:
    cursor = grades.find({'type': 'homework'})

except:
    print "Unexpected error:", sys.exc_info()[0]

id = None
curr_doc_id = None
curr_score = 0

for doc in cursor:
    if id != doc['student_id']:
        id = doc['student_id']
        curr_doc_id = doc['_id']
        curr_score = doc['score']
    else:
        if curr_score > doc['score']:
            grades.remove(doc)
        else:
            grades.remove({'_id': curr_doc_id})
