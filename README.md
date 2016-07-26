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
