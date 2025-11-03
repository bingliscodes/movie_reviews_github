import { useState, createContext } from "react";

export const MovieDetailsModalContext = createContext();

export const MovieDetailsModalContextProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mediaId, setMediaId] = useState();

  const value = {
    modalIsOpen,
    setModalIsOpen,
    mediaId,
    setMediaId,
  };

  return (
    <MovieDetailsModalContext.Provider value={value}>
      {children}
    </MovieDetailsModalContext.Provider>
  );
};
