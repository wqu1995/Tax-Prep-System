package com.skillstorm.taxprepsystem.security;

/**
 * Security related constants.
 */
public class SecurityConstants {
    public static final long JWT_EXPIRATION = 60480000;
    public static final long COOKIE_EXPIRATION = 604800;
    public static final String JWT_SECRET= "skillstorm";
    public static final String PROD_ORIGIN= "http://3.239.159.169";

    public static final String DEV_ORIGIN= "http://localhost:5173/";

}
