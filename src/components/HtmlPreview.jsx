import { useEffect, useState } from 'react';
import { renderMainLayout } from "../service/JsonToHtml";
import { getResumeByUserId, getCoverLetterByUserId } from '../service/firebase';

// PMWBy0PBMRMSfLQfOpVLJqjYyNr2
function HtmlPreview({ type, userId }) {
    const [contentHtml, setContentHtml] = useState('');

    useEffect(() => {
        if (userId) {
            const getHtml = async () => {
                let data = null;
                if (type === 'resumes') {
                    data = await getResumeByUserId(userId);
                } else if (type === 'coverletters') {
                    data = await getCoverLetterByUserId(userId);
                }
                try {
                    if (data !== null) {
                        const { layout, ...dataInDoc } = data;
                        const htmlLayout = renderMainLayout(layout, dataInDoc);
                        setContentHtml(htmlLayout);
                    }
                } catch (ex) {
                    console.log(ex)
                }
            };
            getHtml();
        }
    }, [type, userId]);

    return (
        <iframe
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
                overflow: 'hidden',
            }}
            srcDoc={contentHtml}
            title="CV-maker"
        />
    );
}

export default HtmlPreview;
