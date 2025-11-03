import { Dialog, CloseButton, Portal } from "@chakra-ui/react";
import { useContext } from "react";

import { MovieDetailsModalContext } from "../../store/MovieDetailsModalContext";
import MovieDetailsPage from "../../pages/MovieDetailsPage";

export default function MovieDetailsModal() {
  const { modalIsOpen, setModalIsOpen, mediaId } = useContext(
    MovieDetailsModalContext
  );
  return (
    <Dialog.Root
      open={modalIsOpen}
      onOpenChange={(e) => setModalIsOpen(e.open)}
      size="full"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Movie Details</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <MovieDetailsPage type="movie" mediaIdBackup={mediaId} />
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color="black" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
