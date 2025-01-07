import HtmlPreview from './components/HtmlPreview';
function App() {

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
        <HtmlPreview />
      </div>
    </div>
  );
}

export default App;
