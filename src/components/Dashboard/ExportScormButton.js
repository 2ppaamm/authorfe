import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ExportScormButton = ({ courseId }) => {
    const { authToken } = useContext(AuthContext);

    const handleExport = () => {
        fetch(`/api/scorm/export/${courseId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to export SCORM package.');
                }
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `course-${courseId}-scorm.zip`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((err) => console.error(err));
    };

    return <button onClick={handleExport}>Export to SCORM</button>;
};

export default ExportScormButton;
