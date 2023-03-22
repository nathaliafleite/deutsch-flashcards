import { Adjective } from "../../app/helpers/types";

type Props = {
  data: Adjective;
  flip: boolean;
  handleFlip: () => void;
  count: number;
  index: number;
};

const FlashcardAdjective: React.FC<Props> = ({
  data,
  flip,
  handleFlip,
  count,
  index,
}) => {
  const { word, translation } = data;

  return (
    <div className="container">
      <div className="counter">
        {index + 1} of {count}
      </div>
      <div className={`flashcard ${flip ? "flip" : ""}`} onClick={handleFlip}>
        <div className="flashcard--front">
          <h1 className="flashcard__word">{word}</h1>
        </div>
        <div className="flashcard--back adjective">
          <div className="flashcard__header">
            <h1>{translation}</h1>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardAdjective;
