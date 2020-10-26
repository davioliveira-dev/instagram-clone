import styled from 'styled-components';

interface ThumbnailProps {
  preview: any,
  image: any,
}

export const Form = styled.form`
  width: 100%;
  max-width: 580px;
  margin: 30px auto 0;
  margin-bottom: 30px;
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;

  p {
    margin-bottom: 10px;
  }
`;

export const Thumbnail = styled.label`
  margin-bottom: 20px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 250px;
  background-image: ${
  (props: ThumbnailProps) =>
      props.image === null ? 'none' : `url(${props.preview})`
};
  display: ${(props: ThumbnailProps) => props.preview === null ? 'none' : ''};
`;

export const FormInputs = styled.input`
  height: 38px;
  border-radius: 4px;
  min-width: 80%;
  border: 1px solid #ddd;
  padding: 0 20px;
  font-size: 14px;
  margin: 10px 0;
`;

export const FormTextArea = styled.textarea`
  height: 38px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 10px 20px;
  font-size: 14px;
  margin-bottom: 10px;
  height: 100px;
  resize: none;
  min-width: 80%;
`;

export const Button = styled.button`
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


