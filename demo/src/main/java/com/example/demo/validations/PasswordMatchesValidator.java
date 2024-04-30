package com.example.demo.validations;

import com.example.demo.annotations.PasswordMatches;
import com.example.demo.payload.request.SignupRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {
    @Override
    public void initialize(PasswordMatches constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        SignupRequest userSignupRequest = (SignupRequest) o;
        return userSignupRequest.getPassword().equals(userSignupRequest.getConfirmPassword());
    }
}
