<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php if ($_POST['nama']): ?>
        <h1><?= $_POST['nama'] ?></h1>
        <h1><?= $_POST['nim'] ?></h1>
    <?php endif ?>
    <div id="quiz-container">
        <div id="question-navigation">
        </div>
        <p id="question-number"></p>
        <p id="question">Berapakah hasil dari 8 + 5?</p>
        <div id="choices"></div>
        <input type="text" id="answer" placeholder="Your answer">
        <button onclick="nextQuestion()" id="next">Next</button>
        <p id="timer">Time remaining: <span id="time-left">30</span>s</p>
        <p id="status"></p>
    </div>

    <script src="script.js"></script>
</body>

</html>