import type { Category, Choice, Question } from '../types';

function makeQuestion(
  text: string,
  choiceLabels: [string, string, string, string],
  correctIndex: number,
  explanation: string,
  timeLimitSec: number,
  category: Category
): Question {
  const choices: Choice[] = choiceLabels.map((label) => ({ id: crypto.randomUUID(), label }));
  return {
    id: crypto.randomUUID(),
    text,
    choices,
    correctChoiceId: choices[correctIndex].id,
    explanation,
    timeLimitSec,
    category,
  };
}

export const initialQuestions: Question[] = [
  makeQuestion(
    'let, const, var のうち、再代入も再宣言もできる変数宣言はどれですか？',
    ['var', 'let', 'const', 'class'],
    0,
    'varは関数スコープの変数宣言で、再代入・再宣言のどちらも可能です。',
    20,
    'JavaScript'
  ),
  makeQuestion(
    '配列の各要素を変換し、新しい配列を返すメソッドはどれですか？',
    ['map', 'forEach', 'reduce', 'filter'],
    0,
    'mapは各要素にコールバック関数を適用し、その結果からなる新しい配列を返すメソッドです。',
    20,
    'JavaScript'
  ),
  makeQuestion(
    'Promiseの解決を待ち、非同期処理を同期的に書けるようにするキーワードはどれですか？',
    ['await', 'async', 'yield', 'defer'],
    0,
    'awaitはasync関数内で使用し、Promiseが解決されるまで処理を待機させるキーワードです。',
    15,
    'JavaScript'
  ),
  makeQuestion(
    'TypeScriptでオブジェクトの形状（プロパティと型）を定義する際によく使う構文はどれですか？',
    ['interface', 'class', 'function', 'import'],
    0,
    'interfaceはオブジェクトが持つべきプロパティとその型を定義するための構文です。',
    20,
    'TypeScript'
  ),
  makeQuestion(
    '変数の型がstringまたはnumberのどちらかであることを表す型はどれですか？',
    ['string | number', 'string & number', 'string[number]', 'string(number)'],
    0,
    '「|」はユニオン型を表し、複数の型のうちいずれか一つであることを示します。',
    20,
    'TypeScript'
  ),
  makeQuestion(
    '関数の引数が省略可能であることを示す記号はどれですか？',
    ['?', '!', '&', '*'],
    0,
    '引数名の後ろに「?」を付けると、その引数はオプショナル（省略可能）になります。',
    15,
    'TypeScript'
  ),
  makeQuestion(
    'コンポーネントの状態（state）を保持・更新するために使うフックはどれですか？',
    ['useState', 'useEffect', 'useMemo', 'useRef'],
    0,
    'useStateはコンポーネント内で状態を保持し、更新関数で再レンダリングを発生させるフックです。',
    15,
    'React'
  ),
  makeQuestion(
    'データ取得やタイマー設定などの副作用を実行するために使うフックはどれですか？',
    ['useEffect', 'useState', 'useCallback', 'useContext'],
    0,
    'useEffectはレンダー後に副作用処理を実行し、クリーンアップ関数で後始末もできるフックです。',
    15,
    'React'
  ),
  makeQuestion(
    'リストをレンダリングする際、各要素に指定する必要がある特別な属性はどれですか？',
    ['key', 'id', 'ref', 'index'],
    0,
    'keyはReactが各要素を一意に識別し、効率的に再描画するために必要な属性です。',
    15,
    'React'
  ),
];
