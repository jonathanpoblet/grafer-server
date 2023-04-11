import { transporter } from "../email/index.js";


export async function controllerPostEmail(req, res) {
  const contact = req.body
  if(contact.name && contact.email && contact.title && contact.message) {
    await transporter.sendMail({
      from: 'Servidor Node.js',
      to: 'jonathanpoblet228@gmail.com',
      subject: 'Consulta nueva',
      html: `<h4>Nueva consulta de:</h4><p>Nombre: ${contact.name}</p><p>Email: ${contact.email}</p><div><p>Titulo: ${contact.title}</p><p>Mensaje: ${contact.message}</p><br></div>`
  })
    res.json({ succesfull: "Email send" });
  } else res.status(404).json({error: 'Faltan datos de envio'});
}
