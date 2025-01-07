import { useEffect, useState } from 'react';
import HtmlPreview from './components/HtmlPreview';
function App() {
  const [request, setRequest] = useState({ userId: '', type: '' });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get('type');
    const userId = queryParams.get('userId');
    setRequest({ type, userId })
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-vector/abstract-technological-background_23-2148897676.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div
        style={{
          width: '796px',
          height: '100vh',
        }}
      >
        <HtmlPreview userId={request.userId} type={request.type} />
      </div>
    </div>
  );
}

export default App;
