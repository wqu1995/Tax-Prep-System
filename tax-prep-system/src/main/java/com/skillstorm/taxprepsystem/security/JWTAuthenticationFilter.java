package com.skillstorm.taxprepsystem.security;

import com.skillstorm.taxprepsystem.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Custom filter for handling JWT authentication.
 */
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTGenerator tokenGenerator;

    @Autowired
    private UserService userService;


    /**
     * Perform the token validation. If token does not exist in the cookie, proceed with the next filter chain ELSE
     * validate the token and attempt to authenticate user
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getJWTFromCookie(request);
        if(token == null){
            filterChain.doFilter(request, response);
            return;
        }
        if(StringUtils.hasText(token) && tokenGenerator.validateToken(token)){
            String username = tokenGenerator.getUsernameFromJWT(token);


            UserDetails userDetails = userService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        }
        filterChain.doFilter(request, response);
    }

    private String getJWTFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }
    /**
     * Get token from request header cookie.
     */
    private String getJWTFromCookie(HttpServletRequest request){
        try{
            Cookie[] cookies = request.getCookies();
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("test-cookie")){

                    return cookie.getValue();
                }
            }
            return null;
        }catch (NullPointerException ex){
            return null;
        }

    }
}
