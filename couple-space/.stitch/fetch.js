const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (err) => { fs.unlink(dest, () => reject(err)); });
    }).on('error', reject);
  });
}

Promise.all([
  download("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NDc1YjZhODk2NWIwMzM4NWI2OTQ4MWU0ZjUzEgsSBxDA8MaToQkYAZIBIwoKcHJvamVjdF9pZBIVQhMzNTA0OTU3ODkwMzA0MjMwNjA1&filename=&opi=89354086", ".stitch/designs/memory-journey.html"),
  download("https://lh3.googleusercontent.com/aida/AP1WRLtsuplS2N7NITNUXX6MomkRugszxF8qguSJw5xFCmhlmxMU1aD-I2x3UofbavFR-1D1X3e2KQjNQeS0AgVcxg0DcirCdzWAV2XyUqInVacNq6K1Ip04EbpaxpViuEzscphEFI_dX_5LcEag172XD6yjUp-Q4mOFB0Wz03g4tHduEF8O0EcwGKjvEuLeFeWlydB3bzvhShmTdfgO8SdPVh3dR8gwwrGh3to51pCELvgMYU8_5-fKhiBpE90=w2560", ".stitch/designs/memory-journey.png")
]).then(() => console.log('Done')).catch(console.error);
