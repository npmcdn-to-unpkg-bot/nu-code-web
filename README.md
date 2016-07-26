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
