const { cloudinary } = require('./cloudinary');

const uploadToCloudinary = (req, res, next) => {
  const { photos } = req.body;

  if (photos.length === 0) {
    next();
    return;
  }

  const promises = photos.map((file) =>
    cloudinary.uploader
      .upload(file, {
        upload_preset: 'FEC_project',
      })
      .then(
        (result) =>
          // console.log('Cloudinary Upload Success: ', result.url);
          result.url
      )
      .catch(next)
  );

  Promise.all(promises).then((urls) => {

    let formatedURLs = [];
    for(let url of urls) {
      var sliced = url.split('upload/')
      var combine = sliced[0].concat('upload/f_auto/', sliced[1])
      formatedURLs.push(combine);
    }

    return formatedURLs;
  })
  .then(formatedURLs => {
    req.body.photoUrls = formatedURLs;
    console.log('uploaded photos urls: ', formatedURLs);
    next();
  });
};

module.exports = { uploadToCloudinary };
