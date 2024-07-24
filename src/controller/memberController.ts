import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Membro from '../models/membro';
import { jwtSecret, jwtExpiresIn } from '../utils/config';


class MemberController {
  static createMember(req: Request, res: Response): void {
    res.render('member/register');
  }

  static async createMemberSave(req: Request, res: Response): Promise<void> {
    const { nome, email, senha } = req.body;
    try {
      await Membro.create({ nome, email, senha });

      res.redirect(`/member/home`);
    } catch (err) {
      res.status(500).send('Erro ao criar o membro');
    }
  }

  static login(req: Request, res: Response): void {
    res.render('member/login');
  }

  static async loginSave(req: Request, res: Response): Promise<void> {
    const { email, senha } = req.body;
    
    try {
      const membro = await Membro.findOne({ where: { email } });

      if (!membro) {

        res.status(401).send('Email não encontrado');
        return;
      }

      const match = await membro.checkPassword(senha);

      if (!match) {
        res.status(401).send('Senha incorreta');
        return;
      }

      const token = jwt.sign({ id: membro.id, email: membro.email }, jwtSecret, { expiresIn: jwtExpiresIn });

      res.json({ token });

    } catch (err) {
      res.status(500).send('Erro ao fazer login');
    }
  }

  static home(req: Request, res: Response): void {
    res.render('layout/home');
  }
}

export default MemberController;
