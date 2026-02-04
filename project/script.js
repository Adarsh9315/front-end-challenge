const openings = [
  { name: "King's Pawn", moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5'] },
  { name: "Queen's Gambit", moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6'] },
  { name: 'Sicilian Defense', moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4'] },
];

const boardEl = document.getElementById('board');
const cardEls = document.querySelectorAll('.opening-card');
const accordionTriggers = document.querySelectorAll('.accordion__trigger');

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

const createBoard = () => {
  const fragment = document.createDocumentFragment();
  ranks.forEach((rank, rowIdx) => {
    files.forEach((file, colIdx) => {
      const square = document.createElement('div');
      square.className = `square ${(rowIdx + colIdx) % 2 === 0 ? 'light' : 'dark'}`;
      square.dataset.square = `${file}${rank}`;
      fragment.appendChild(square);
    });
  });
  boardEl.appendChild(fragment);
};

const highlightMoves = (moves) => {
  const squares = boardEl.querySelectorAll('.square');
  squares.forEach((sq) => sq.classList.remove('highlight'));
  moves.forEach((move) => {
    const square = boardEl.querySelector(`[data-square="${move.slice(-2).toLowerCase()}"]`);
    if (square) {
      square.classList.add('highlight');
    }
  });
};

cardEls.forEach((card, index) => {
  card.addEventListener('click', () => {
    cardEls.forEach((c) => c.classList.remove('active'));
    card.classList.add('active');
    highlightMoves(openings[index].moves);
  });
});

accordionTriggers.forEach((trigger) => {
  const panel = trigger.nextElementSibling;
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});

createBoard();
cardEls[0]?.classList.add('active');
highlightMoves(openings[0].moves);
