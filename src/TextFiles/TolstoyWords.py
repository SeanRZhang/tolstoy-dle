import string

wordleAnswers = set()

with open("anna-karenina.txt", "r") as annaKarenina:
    for line in annaKarenina:
        line = (
            line.lower().replace("”", "").replace("’", "").replace("—", "").strip("\n")
        )
        line = line.translate(str.maketrans("", "", string.punctuation)).translate(
            str.maketrans("", "", string.digits)
        )
        wordLi = line.split(" ")
        for word in wordLi:
            if len(word) == 5:
                wordleAnswers.add(word)

with open("war-and-peace.txt", "r") as warPeace:
    for line in warPeace:
        line = line.lower().strip("\n")
        line = line.translate(str.maketrans("", "", string.punctuation)).translate(
            str.maketrans("", "", string.digits)
        )
        wordLi = line.split(" ")
        for word in wordLi:
            if len(word) == 5:
                wordleAnswers.add(word)

with open("tolstoy-word-bank.txt", "w") as tolstoyWords:
    for word in wordleAnswers:
        tolstoyWords.write(word + "\n")
