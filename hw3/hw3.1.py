import sys

import pymongo


# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the database
db = connection.school
students = db.students

try:
    cursor = students.find()

except:
    print "Unexpected error:", sys.exc_info()[0]

for student in cursor:
    scores = student['scores']
    home_scores = [x for x in scores if x['type'] == "homework"]
    min_home_score = min(home_scores, key=lambda scores: scores['score'])
    scores.remove(min_home_score)
    students.update({"_id": student['_id']}, {"$set": {"scores": scores}})
