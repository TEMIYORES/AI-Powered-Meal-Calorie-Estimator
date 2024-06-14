import { StylesConfig } from "react-select";
import { option } from "../assets/subjects";
import styled from "styled-components";
import { Button, Container, Paper } from "@mui/material";

export const customStyles: StylesConfig<option, true> = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    marginTop: "0.5rem" /* 8px */,
    paddingLeft: "0.75rem" /* 12px */,
    paddingRight: "0.75rem" /* 12px */,
    backgroundColor: "transparent",
    outline: "2px solid transparent",
    outlineOffset: "2px",
    borderWidth: "1px",
    borderColor: state.isFocused ? "#4f46e5" : "#737373",
    boxShadow: state.isFocused ? "0 1px 2px 0 #737373" : "",
    borderRadius: "0.5rem",
    "&:hover": {
      borderColor: state.isFocused ? "#4f46e5" : "#737373",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#262626",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#171717" : "#262626", // Tailwind 'bg-indigo-100' : 'bg-white'
    color: state.isSelected ? "#737373" : "#737373",
    margin: "0",
    padding: "0.5rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#171717", // Tailwind 'bg-indigo-100'
    },
    ...(state.isSelected && {
      backgroundColor: "#4f46e5", // Tailwind 'bg-indigo-500'
      color: "#737373", // Tailwind 'text-white'
    }),
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "transparent", // Tailwind 'bg-indigo-100'
    border: "1px solid #737373",
    color: "#737373", // Tailwind 'text-indigo-700'
    display: "flex",
    alignItems: "center",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#d4d4d4", // Tailwind 'text-indigo-700'
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#4f46e5", // Tailwind 'text-indigo-700'
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f43f5e", // Tailwind 'bg-indigo-200'
      color: "#4f46e5", // Tailwind 'text-indigo-900'
      height: "20px",
    },
    marginLeft: "0.5rem",
  }),
};

export const CustomButton = styled(Button)`
  background-color: #6200ea;
  color: #737373;
  &:hover {
    background-color: #4f46e5;
  }
`;

export const CustomContainer = styled(Container)`
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
`;
export const StyledPaper = styled(Paper)`
  background-color: #000;
  box-shadow: 0 3px 10px rgba(233, 233, 233, 0.2);
`;
