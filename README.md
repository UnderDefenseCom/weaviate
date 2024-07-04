# WeaviateInstanceRole
```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "allowLogsPushing",
			"Effect": "Allow",
			"Action": [
				"logs:CreateLogStream",
				"logs:CreateLogGroup",
				"logs:PutLogEvents"
			],
			"Resource": [
				"arn:aws:logs:eu-west-1:855501706185:log-group:weaviate-local",
				"arn:aws:logs:eu-west-1:855501706185:log-group:weaviate-local:*"
			]
		}
	]
}
```