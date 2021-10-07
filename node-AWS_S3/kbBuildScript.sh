cd ~/flexbuild.io/knowledge_base/
    npm run build-dev
    zip knowledge_base.zip dist/*
    mv knowledge_base.zip ~/github-repo/nodeapi/node-AWS_S3/data/

cd ~/github-repo/nodeapi/node-AWS_S3/
node s3Upload.js