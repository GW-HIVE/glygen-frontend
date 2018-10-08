package com.glygen;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

public class excelToJson {
    /**
     * the name with path of the repository data report file
     */
    public static final String INPUT_FILE_NAME = "/Applications/MAMP/htdocs/glygen-frontend/key-value.xlsx";
    /**
     * the name with path of the result report file
     */
    public static final String RESULT_FILE_NAME = "/Applications/MAMP/htdocs/glygen-frontend/Front-End/src/content/key-value.json";
    /**
     * set this to true to display exception.
     */
    public static final boolean SHOW_EXCEPTION = true;

    public static void main(String[] args) {
        try {
            FileInputStream excelFile = new FileInputStream(new File(INPUT_FILE_NAME));
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = sheet.iterator();
            char last_column = 'H';
            int numOfColumns = (int) last_column - 64;
            int numOfRows = 70;

            // column positions in excel.
            final int TERM = (int) 'A' - 65;
            final int ABREVIATED_TERM = (int) 'B' - 65;
            final int KEY = (int) 'C' - 65;
            final int PROPERTY = (int) 'D' - 65;
            final int TOOL_TIP = (int) 'E' - 65;
            final int DESCRIPTION = (int) 'F' - 65;
            final int EXAMPLE = (int) 'G' - 65;
            final int DATA_TYPE = (int) 'H' - 65;

            // System.out.println("First row: " + datatypeSheet.getFirstRowNum());
            // System.out.println("Last row: " + datatypeSheet.getLastRowNum());
            ArrayList rowElements = new ArrayList<>();
            String op ="{";
            for (int currentRow = 1; currentRow < numOfColumns; currentRow++) {
                Row r = sheet.getRow(currentRow);
                if (r == null) {
                    // This whole row is empty
                    continue;
                }

                for (int currentColumn = 0; currentColumn < numOfColumns; currentColumn++) {
                    Cell currentCell = r.getCell(currentColumn);
                    if (currentCell == null || currentCell.getCellType() == CellType.BLANK) {
                        // System.out.print("NULL||");
                        rowElements.add("\"\"");
                    } else if (currentCell.getCellType() == CellType.NUMERIC) {
                        // System.out.print(currentCell.getNumericCellValue() + "||");
                        rowElements.add(currentCell.getNumericCellValue());
                    } else if (currentCell.getCellType() == CellType.STRING) {
                        // System.out.print(currentCell.getStringCellValue() + "||");
                        rowElements.add(currentCell.getStringCellValue());
                    }
                }
                // System.out.print(
                //         "\"" + r.getCell(KEY) + "\": { \"term\": \"" + r.getCell(TERM) + "\", \"abreviated_term\": \""
                //                 + r.getCell(ABREVIATED_TERM) + "\", \"property\": \"" + r.getCell(PROPERTY) + "\" }");
                op +=
                        rowElements.get(KEY) + ": { \"term\": " + rowElements.get(TERM) + ", \"abreviated_term\": "
                                + rowElements.get(ABREVIATED_TERM) + ", \"property\": " + rowElements.get(PROPERTY) + " }";
                if (currentRow != numOfRows - 1)
                    op +=",\n";
                // System.out.println();
                rowElements.clear();
            }
            op+="}";
//            System.out.print(op);
            JSONObject jsonObj = new JSONObject(op);
            System.out.print(jsonObj);
            // while (iterator.hasNext()) {
            //
            // Row currentRow = iterator.next();
            // Iterator<Cell> cellIterator = currentRow.iterator();
            //
            // while (cellIterator.hasNext()) {
            //
            // Cell currentCell = cellIterator.next();
            // // getCellTypeEnum shown as deprecated for version 3.15
            // // getCellTypeEnum ill be renamed to getCellType starting from version 4.0
            // if (currentCell.getCellType() == CellType.STRING) {
            // System.out.print(currentCell.getStringCellValue() + "--");
            // } else if (currentCell.getCellType() == CellType.NUMERIC) {
            // System.out.print(currentCell.getNumericCellValue() + "--");
            // }
            // else{
            // System.out.print("NULL--");
            // }
            // }
            // System.out.println();
            // }
            workbook.close();
            excelFile.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
