import React, { useState, useEffect } from "react";

export const HOOKS_TITLE = "Hello From Hooks";

export const FORM_FIELD_IDS = {
  USERNAME: "USERNAME",
};

const Input = ({ value, setInputField, id, name }) => {
  return (
    <input
      id={id}
      name={name}
      type="text"
      onChange={setInputField}
      value={value}
    />
  );
};

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [url]);

  return { loading, data, error };
};

const handleOnSubmit = (e) => {
  e.preventDefault();

  console.log(e.target);

  const url = e.target[0].value;
  console.log(url);

  // const { loading, data, error } = useFetch();
};

export function FormWIP() {
  const [inputField, setInputField] = useState("");

  return (
    <>
      <h1>{HOOKS_TITLE}</h1>

      <form onSubmit={handleOnSubmit}>
        <Input
          id={FORM_FIELD_IDS.USERNAME}
          name={FORM_FIELD_IDS.USERNAME}
          value={inputField}
          setInputField={(e) => setInputField(e.target.value)}
        />
      </form>
    </>
  );
}
