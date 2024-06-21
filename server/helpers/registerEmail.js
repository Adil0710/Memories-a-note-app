export default function registerEmail (name) {
    return (
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Memories</title>
    <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
    rel="stylesheet"
/>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 570px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #007BFF;
        }
        .content p {
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            color: #666;
            border-radius: 0 0 8px 8px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            font-size: 16px;
            color: #ffffff;
            background-color: #007BFF;
            border-radius: 5px;
            text-decoration: none;
        }
        .gradient-text {
    background: linear-gradient(135deg, #17ead9, #6078ea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to  <strong class="gradient-text">Memories ✨</strong></h1>
        </div>
        <div class="content">
            <h2>Hello, ${name}</h2>
            <p>We are thrilled to have you on board with <strong class="gradient-text">Memories ✨</strong> your ultimate note-taking app!</p>
            <p>With Memories, you can easily create and store your notes, ensuring that your important thoughts and ideas are always within reach. You can also download your notes in text format, allowing for easy sharing and backup.</p>
            <p>Our secure login and signup features ensure that your information is safe and protected. And this is just the beginning – we have many exciting new features coming soon to enhance your experience!</p>
            <p>Get started by logging into your account and exploring the features of Memories. We are confident that you will find it invaluable for keeping track of your notes.</p>
            <p>Thank you for choosing  <strong class="gradient-text">Memories ✨</strong></p>
            <p>Best regards,<br>The Memories Team</p>
            <a href="https://memories-note-app.vercel.app/login" class="button">Log In to Memories</a>
        </div>
        <div class="footer">
            <p>&copy; 2024  <strong class="gradient-text">Memories ✨</strong>. All rights reserved.</p>
            <p><a href="https://yourapp.com/privacy">Privacy Policy</a> | <a href="https://yourapp.com/terms">Terms of Service</a></p>
        </div>
    </div>
</body>
</html>
`
    )
}