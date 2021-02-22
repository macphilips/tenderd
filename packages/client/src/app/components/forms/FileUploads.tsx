import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import styles from "./FileUploads.module.scss"

export function FileUploads(props: { onChange: (files: File[]) => void }) {
  const [files, setFiles] = useState<File[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      props.onChange(acceptedFiles)
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img src={(file as any).preview} className={styles.img} />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL((file as any).preview))
    },
    [files]
  )

  return (
    <section className={styles.root}>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className={styles.thumbsContainer}>{thumbs}</aside>
    </section>
  )
}
