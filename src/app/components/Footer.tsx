export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-4 mt-auto">
      <div className="flex flex-col sm:flex-row text-center justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <a href="https://morgangiraud.com" className="hover:text-other-light">
          Made with ❤️ by me 🙋🏻‍♂️ and chatGPT 🤖
        </a>
        <p> - </p>
        <a
          href="https://twitter.com/francoisfleuret/status/1654190844776271879"
          className="hover:text-other-light"
        >
          Inspired by this tweet 🐦
        </a>
      </div>
    </footer>
  );
}
