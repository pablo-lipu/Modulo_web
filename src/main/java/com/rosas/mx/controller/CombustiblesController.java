package com.rosas.mx.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller // Esta anotacion me permite renderizar html desde mi path templates
@RequestMapping("/combustibles")
public class CombustiblesController {

	@GetMapping("/lista_combustibles")
	public String listarCombustiblesTodos() {

		return "pages/catalogoTipoCombustibles/CatComb";
	}

	@GetMapping("/usuarios")
	public String cat() {

		return "pages/usuarios/catUsuarios";
	}

}
