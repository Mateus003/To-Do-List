import { Request, Response } from 'express';
import Member from '../models/membro';

class MemberController {
  static createMember(req: Request, res: Response): void {
    res.render('member/register');
  }

  static async createMemberSave(req: Request, res: Response): Promise<void> {
    const { nome, email, senha } = req.body;

    if (!nome || nome.length < 5 || nome.length > 255) {
      res.status(400).send('Nome deve ter entre 5 e 255 caracteres');
      return;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400).send('Email inválido');
      return;
    }

    if (!senha || senha.length < 3) {
      res.status(400).send('Senha deve ter no mínimo 3 caracteres');
      return;
    }

    try {
      await Member.create({ nome, email, senha });

      res.redirect(`/member/home`);
    } catch (err) {
      res.status(500).send('Erro ao criar o membro');
    }
  }

  static login(req: Request, res: Response): void {
    res.render('member/login');
  }

  static async loginSave(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400).send('Email inválido');
      return;
    }

    try {
      const member = await Member.findOne({ where: { email, senha:password } });

      if (!member) {
        res.status(401).send('Email não encontrado');
        return;
      }

      res.redirect(`/member/home`);
    } catch (err) {
      res.status(500).send('Erro ao fazer login');
    }
  }

  static home(req: Request, res: Response): void {
    res.render('layout/home');
  }
}

export default MemberController;
