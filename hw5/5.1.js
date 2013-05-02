db.posts.aggregate([
{
	$project: {
		c_author: "$comments.author"
	}
},
{
	$unwind: "$c_author"
},
{
	$group: {
		_id: "$c_author",
		count: {$sum:1}
	}
},
{
	$sort:{
		"count": 1
	}
}]);
///////////////////////////////////////////////////////////////////
db.zips.aggregate([
{
	$match: {
		"state" : {$in: ["CA","NY"]},
	}
},
{
	$group : {
		_id: {
			state : "$state",
			city: "$city"
		},
		psum: {$sum:"$pop"} 
	}
},
{
	$match: {
		psum: {$gt: 25000}
	}
},
{
	$group: {
		_id: null,
		average: {$avg: "$psum"}
	}
}]);
//////////////////////////////////////////////////////////////////////
mongoimport -d test -c grades --drop < grades_5-3.js

db.grades.aggregate([
{
	$unwind: "$scores"

},
{
	$match: {
		"scores.type": {$ne: "quiz"}
	}
},
{
	$group:{
		_id: {
			student_id: "$student_id",
			class_id: "$class_id"
		},
		average:{$avg: "$scores.score"} 
	}
},
{
	$group :{
		_id: "$_id.class_id",
		average: {$avg: "$average"}
	}
},
{
	$sort: {
		"average": 1
	}
}]);