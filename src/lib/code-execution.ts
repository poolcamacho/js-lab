export async function executeJavaScript(code: string): Promise<any> {
    try {
        const asyncFunction = new Function(`
      return (async () => {
        try {
          ${code}
        } catch (error) {
          console.error(error);
          throw error;
        }
      })();
    `)

        return await asyncFunction()
    } catch (error) {
        throw error
    }
}

