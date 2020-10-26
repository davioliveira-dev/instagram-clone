import styled from 'styled-components';

export const NoneTitle = styled.p`
  margin: 10px 20px;
  font-size: 16px;
  color: #737373;
`;

export const Title = styled.h1`
  margin: 10px 20px;
`;

export const Content = styled.div`
  padding: 10px 20px;

  > strong {
    display: block;
    margin: 5px 0;
  }
  > p {
    color: #737373;
  }
`;

export const Form = styled.form `
  margin: 10px 20px;

  p {
    margin: 10px 0;
  }
`;

export const Input = styled.input`
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 10px;
  background-color: #fafafa;
  padding: 5px 0 7px 8px;
  border-radius: 4px;
  color: #262626;
  border: 1px solid #737373;
`;

export const Button = styled.button`
  display: block;
  padding: 10px 20px;
  border-radius: 4px;
  border: 0;
  background: #0095F6;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.5s;

  :hover {
    background: #0061F1;
    transition: background 0.5s;
  }
`;
