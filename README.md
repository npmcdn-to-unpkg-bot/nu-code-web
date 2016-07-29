```c
#include <stdio.h>
#include <stdlib.h>

int main ()
{
	char buffer[256];
	fgets(buffer, 256, stdin);

	int x = atoi(buffer);
	int y = x + 2;
	printf("%d", y);

	return 0;
}
```

```java
import java.util.Scanner;

public class Solution {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int x = scanner.nextInt();
        int y = x + 2;
        System.out.println(y);
    }

}
```

```js
process.stdin.resume();
process.stdin.setEncoding('ascii');

var inputStdin = "";
var inputStdinArray = "";
var inputCurrentLine = 0;

process.stdin.on('data', function (data) {
	inputStdin += data;
});

process.stdin.on('end', function () {
    inputStdinArray = inputStdin.split("\n");
    main();
});

function readLine() {
    return inputStdinArray[inputCurrentLine++];
}

function main() {
    var n = parseInt(readLine());
    console.log(n + 2);
}
```

## Reading File Input

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Solution {
	public static void main(String[] args) {
    	String total = "";
		BufferedReader br = null;
		try {
			String sCurrentLine;
			br = new BufferedReader(new FileReader("input-0"));
			while ((sCurrentLine = br.readLine()) != null) {
				total += sCurrentLine;
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
        throw new RuntimeException(total);
	}
}
```

### Socket

```java
import java.net.*;
import java.io.*;

public class Solution {
    public static String getHtml(String urlToRead) throws Exception {
      StringBuilder result = new StringBuilder();
      URL url = new URL(urlToRead);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("GET");
      BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      String line;
      while ((line = rd.readLine()) != null) {
         result.append(line);
      }
      rd.close();
      return result.toString();
   }

    public static void main(String[] args) throws Exception {
        throw new RuntimeException(getHtml("http://www.google.com"));
    }
}
```
