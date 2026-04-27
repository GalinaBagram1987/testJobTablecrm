export default function handler(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    console.log('ECHO received:', body);
    res.status(200).json({ received: body });
  });
}
