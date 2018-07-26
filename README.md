
```
aws cloudwatch put-dashboard --dashboard-name $TARGET_DASHBOARD --dashboard-body "$(aws cloudwatch get-dashboard --dashboard-name $SOURCE_DASHBOARD --query 'DashboardBody' --output text | aws-cw-annotate )"
```
