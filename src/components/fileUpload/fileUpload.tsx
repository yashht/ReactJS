import React, { useEffect, useRef } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

interface FileUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
  maxSize?: number;
  accept?: any;
  triggerOpen: React.MutableRefObject<(() => void) | null>;
  children?: React.ReactNode;
  multiple?: boolean; 
  maxFiles?: number; 
}

/**
 * Functional component for a file upload feature.
 * @param {FileUploadProps} onDrop - Function to handle file drop event.
 * @param {number} maxSize - Maximum size of the file to be uploaded.
 * @param {string} accept - File types accepted for upload.
 * @param {Function} triggerOpen - Function to trigger file upload dialog.
 * @param {ReactNode} children - Child components to render within the file upload section.
 * @returns JSX element for file upload section.
 */
function FileUpload({
  onDrop,
  maxSize,
  accept,
  triggerOpen,
  children,
  multiple = false, 
  maxFiles = 1
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const dropzoneOptions: DropzoneOptions = {
    accept: accept,
    maxSize: maxSize,
    onDrop: onDrop,
    multiple: multiple,
    maxFiles: maxFiles,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  /**
   * useEffect hook that triggers the opening of an input element when the triggerOpen function is called.
   * @param {Function} triggerOpen - a function that, when called, triggers the opening of an input element
   * @returns None
   */
  useEffect(() => {
    if (inputRef.current) {
      triggerOpen.current = () => {
        if (inputRef.current) {
          inputRef.current.click();
        }
      };
    }
  }, [triggerOpen]);

  return (
    <section className="container-style">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} ref={inputRef} />
        {children}
      </div>
    </section>
  );
}

export default FileUpload;
