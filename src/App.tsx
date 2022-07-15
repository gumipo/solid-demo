import {
  Component,
  createEffect,
  createMemo,
  createResource,
  createSignal,
} from "solid-js";
import { styled } from "solid-styled-components";

type Dog = {
  message: string;
};

const getDog = async (): Promise<Dog> => {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  return res.json();
};

const App: Component = () => {
  const [value, setValue] = createSignal<string>("neko", {
    equals: (newVal, oldVal) => newVal.length === oldVal.length,
  });

  const [dog] = createResource<Dog>(getDog);

  const [combineValue, setCombineValue] = createSignal("");

  const handleChange = (v: string) => {
    setValue(v);
  };

  const handleClick = () => {
    setValue("hoge");
  };

  //effect
  createEffect(() => {
    setCombineValue(`combine:${value()} `);
  });

  //memo
  const memoValue = createMemo(() => {
    return `combine:${combineValue()} `;
  });

  return (
    <div>
      <input
        value={value()}
        onInput={(e) => handleChange(e.currentTarget.value)}
      />
      <TestComponent>{value()}</TestComponent>
      <button onClick={() => handleClick()}>Hogeにならない</button>

      <div>{combineValue()}</div>
      <div>{memoValue()}</div>
      {!dog.loading && <img src={dog()!.message} alt="dog" />}
    </div>
  );
};

export default App;

const TestComponent = styled.p`
  color: red;
  font-size: 16px;
`;
