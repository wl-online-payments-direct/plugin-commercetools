import { worldlineScript } from 'project.config';

type SetScriptLoaded = (value: boolean) => void;

const useScript = (setScriptLoaded: SetScriptLoaded) => {
  const hasLoadedScript = document.getElementById('worldline-script');
  if (!hasLoadedScript) {
    const script = document.createElement('script');
    script.id = 'worldline-script';
    script.src = worldlineScript;
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener('load', () => setScriptLoaded(true), { once: true });
  }
};

export default useScript;
