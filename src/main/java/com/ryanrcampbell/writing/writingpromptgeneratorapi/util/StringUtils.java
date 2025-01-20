package com.ryanrcampbell.writing.writingpromptgeneratorapi.util;

public class StringUtils {
    public static String replaceHyphensWithSpaces(String input) {
        if (input != null) {
            return input.replace("-", " ");
        }
        return input;
    }
}
