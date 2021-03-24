const mailjet = require('node-mailjet').connect(
  process.env.MAILJET_PUBLIC_KEY,
  process.env.MAILJET_PRIVATE_KEY
)

import { JSONResponse } from 'utils/jsonResponse'

export default async (req, res) => {
  if (!req.body || req.method !== 'POST') {
    JSONResponse(res, 400)
  }
  const { peserta, total } = req.body
  if (!peserta) {
    JSONResponse(res, 400)
  }
  const credentialList = peserta.map(
    ({ name, email, password }, index) =>
      `<li>Peserta ${
        index + 1
      }</li><li>Nama: ${name}</li><li>Email: ${email}</li><li>Password: ${password}</li>`
  )

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'perdosi.developer@gmail.com',
          Name: 'Perdosi'
        },
        To: [
          {
            Email: peserta[0].email,
            Name: peserta[0].name
          }
        ],
        Subject: 'Pendaftaran Akun Perdosi Berhasil!',
        HTMLPart: `<h3>Terima kasih telah melakukan pendaftaran</h3><p>Berikut ini informasi login akun</p>${credentialList}<br /><hr />Jumlah yang harus dibayar<br /><strong>Rp${(
          total / 1000
        ).toFixed(
          3
        )}</strong><p>via <strong>BRI 123456789000 a/n PERDOSRI</strong></p>`
      }
    ]
  })
  const response = (await request).body
  res.send(response)
  res.end()
}
