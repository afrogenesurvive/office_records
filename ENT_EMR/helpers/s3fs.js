


var s3 = require('s3');
//
var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: "AKIARFTS6Q6DALQKT4QR",
    secretAccessKey: "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",
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});

let params = {
  localFile: "some/local/file",

  s3Params: {
    Bucket: "s3 bucket name",
    Key: "some/remote/file",
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  },
};
const s3fs = {
  test: "s3fs connected...",
  params: {},
  upload: upload(),
  download: download(),
  // upload: upload,
  // download: download
}

if (s3fs.params !== {}){
   params = s3fs.params;
}

function upload () {
  console.log(`
    uploading file...
    params: ${params},
    `);
  const uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
}


function download () {
  console.log(`
    downloading file...
    params: ${params},
    `);
  const downloader = client.downloadFile(params);
  downloader.on('error', function(err) {
    console.error("unable to download:", err.stack);
  });
  downloader.on('progress', function() {
    console.log("progress", downloader.progressAmount, downloader.progressTotal);
  });
  downloader.on('end', function() {
    console.log("done downloading");
  });
}




exports.s3fs = s3fs;
