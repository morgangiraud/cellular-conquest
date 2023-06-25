export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-4 mt-auto">
      <div className="text-center">
        <a href="https://morgangiraud.com" className=" hover:text-other-light">
          Made with ❤️ by me 🙋🏻‍♂️ and chatGPT 🤖
        </a>
        {" - "}
        <a
          href="https://twitter.com/francoisfleuret/status/1654190844776271879"
          className=" hover:text-other-light"
        >
          Inspired by this tweet 🐦
        </a>
      </div>
    </footer>
  );
}
