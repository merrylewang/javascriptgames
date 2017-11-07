import java.io.*;
import java.awt.*;
import java.applet.*;

public class test extends Applet {
    public String getWords() throws FileNotFoundException, IOException {
      BufferedReader br = new BufferedReader(new FileReader("words.txt"));
      String words = "";

      String line = br.readLine();
      while (line != null) {
        words += line + " ";
        line = br.readLine();
      }
      return words;
    }
}
