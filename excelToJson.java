package com.glygen;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Iterator;

/**
 * Overall this program will export the data from the “repository” folder into a
 * set of files. It will generate a report that contains metadata for the
 * extracted files. The files in the repository are a collection of image
 * (“.jpg”) and text (“.txt”) files. Some of these files have been assigned the
 * wrong extension in column B of the data.csv file; i.e., some images have been
 * given the “.txt” extension, and some text files have been given the “.jpg”
 * extension.
 * 
 * @author Gaurav Agarwal
 * @since 2018-08-25
 */
public class excelToJson {
    /**
     * the name with path of the repository data report file
     */
    public static final String INPUT_FILE_NAME = "key-value.xlsx";
    /**
     * the name with path of the result report file
     */
    public static final String RESULT_FILE_NAME = "Front-End/src/content/key-value.json";
    /**
     * the csv delimiter that separates the values.
     */
    public static final String CSV_DELIMITER = ",";
    /**
     * used to write to the result report file
     */
    // public static FileWriter writer = null;
    /**
     * set this to true to display exception.
     */
    public static final boolean SHOW_EXCEPTION = false;

    /**
     * Task 1.1 : Copies each file in DATA_FILE_NAME from the “repository path” to
     * the “copy path,” and corrects the extension of each of the mislabeled files.
     * 
     * @param repoPath the repository path or the source
     * @param copyPath the copy path or the destination
     */
    public void copy(String repoPath, String copyPath) {
        FileInputStream instream = null;
        FileOutputStream outstream = null;
        try {
            String givenExt = copyPath.substring(copyPath.lastIndexOf("."));
            String actualExt = getFileExtension(repoPath);
            writer.append(repoPath);
            writer.append(CSV_DELIMITER);
            writer.append(copyPath);
            writer.append(CSV_DELIMITER);

            if (!actualExt.equalsIgnoreCase(givenExt)) {
                // corrected file path
                copyPath = copyPath.substring(0, copyPath.lastIndexOf(".")).concat(actualExt);
                writer.append(copyPath);
            } else {
                writer.append("");
            }
            writer.append(CSV_DELIMITER);

            File infile = new File(repoPath);
            File outfile = new File(copyPath);
            if (!outfile.getParentFile().exists())
                outfile.getParentFile().mkdirs();
            instream = new FileInputStream(infile);
            outstream = new FileOutputStream(outfile);
            byte[] buffer = new byte[1024];

            int length;
            while ((length = instream.read(buffer)) > 0) {
                outstream.write(buffer, 0, length);
            }
            instream.close();
            outstream.close();

        } catch (Exception e) {
            // TODO: handle exception
            if (SHOW_EXCEPTION)
                e.printStackTrace();
        }
    }

    /**
     * Task 1.3 : calculate the file size in bytes.
     * 
     * @param fileName the file whose size needs to be found.
     */
    public void fileSize(String fileName) {
        try {
            writer.append("" + new File(fileName).length());
            writer.append(CSV_DELIMITER);
        } catch (Exception e) {
            if (SHOW_EXCEPTION)
                e.printStackTrace();
        }
    }

    /**
     * Task 1.5 : For each of the text files, calculates the number of lines per
     * file; for each image file, calculates the number of pixels (i.e., height x
     * width).
     * 
     * @param fileName
     */
    public void linePixelCount(String fileName) {
        BufferedReader br = null;
        String count = "";
        try {
            if (getFileExtension(fileName).equalsIgnoreCase(".txt")) {
                int lines = 0;
                br = new BufferedReader(new FileReader(fileName));
                while (br.readLine() != null)
                    lines++;
                count = "" + lines;
                br.close();
            } else {
                BufferedImage bimg = ImageIO.read(new File(fileName));
                count = bimg.getWidth() + " x " + bimg.getHeight();
            }
            writer.append(count);
            writer.append(CSV_DELIMITER);
        } catch (Exception e) {
            // TODO: handle exception
            if (SHOW_EXCEPTION)
                e.printStackTrace();
        }

    }

    /**
     * 
     * @param args[] not being used.
     */
    public static void main(String[] args) {
        try {
            FileInputStream excelFile = new FileInputStream(new File(INPUT_FILE_NAME));
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();

            while (iterator.hasNext()) {

                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();

                while (cellIterator.hasNext()) {

                    Cell currentCell = cellIterator.next();
                    // getCellTypeEnum shown as deprecated for version 3.15
                    // getCellTypeEnum ill be renamed to getCellType starting from version 4.0
                    if (currentCell.getCellType() == Cell.CELL_TYPE_STRING) {
                        System.out.print(currentCell.getStringCellValue() + "--");
                    } else if (currentCell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                        System.out.print(currentCell.getNumericCellValue() + "--");
                    }
                }
                System.out.println();

            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}