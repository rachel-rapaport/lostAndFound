'use client';
import React, { useEffect } from 'react';
import { CldUploadWidget } from "next-cloudinary";
import { saveImage } from '../../utils/uploadImage';

const UploadImage = () => {
    
    useEffect(() => {
        console.log("on load component");
    })

    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            signatureEndpoint="/api/upload/image"
            onSuccess={(result) => {
                if (typeof result.info === "object" && "secure_url" in result.info) {
                    saveImage(result.info.secure_url);
                }
            }}
            options={{
                singleUploadAutoClose: true,
                folder: "found_item_images",
            }}
        >
            {({ open }) => {
                return (
                    <button
                        type="button"
                        onClick={() => open()}
                        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Upload Avatar
                    </button>
                );
            }}
        </CldUploadWidget>
    )
}

export default UploadImage;